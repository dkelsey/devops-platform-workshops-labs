const argv = require('minimist')(process.argv.slice(2));
const {isString} = require('lodash');
const yaml = require('js-yaml');
const readSync = require('read-file-relative').readSync;
const writeFile = require('write');

if(!argv.file || !isString(argv.file)) throw new Error('-f must be a valid file');

const KINDS = {
  REPLICATION_CONTROLLER: 'ReplicationController',
  SERVICE: 'Service',
  TEMPLATE: 'Template',
}


let state = {
  itteratingOverTemplate: false, // if itterating over template all looping functions itterate over an objects key not items
  itteratingKey: 'items',
};

const isFileTemplate = data => data.kind === KINDS.TEMPLATE;

const getFile = filePath => readSync(filePath);

const runPlugins = (data, plugins) => plugins.reduce((data, plugin) => plugin(data), data);

const filterUselessAttributes = () => {
  const file = yaml.safeLoad(getFile(argv.file));
  if(isFileTemplate) {
    state = {
      ...state,
      itteratingOverTemplate: true,
      itteratingKey: 'objects',
    }
  }
  const data = runPlugins(file, [filterOutMetadata, filterOutStatusFromObjects, filterOutUid, filterOutClusterIp]);

  writeToFile(data, argv.file);
}

const filterOutStatusFromObjects = data => ({
  ...data,
  [state.itteratingKey]: data[state.itteratingKey].map(({status, ...item}) => ({
    ...item
  }))
});


const filterOutMetadata = data => ({
  ...data,
  [state.itteratingKey]: data[state.itteratingKey].map(({metadata: {
    creationTimestamp,
    selfLink,
    namespace,
    resourceVersion,
    ...metadata
  }, ...item}) => ({...item, metadata}))
});

const filterOutUid = data => ({
  ...data,
  [state.itteratingKey]: data[state.itteratingKey].map(item => {
    if(item.kind !== KINDS.REPLICATION_CONTROLLER) {
      // do not delete uids from replication controllers
      delete item.metadata.uid;
    }
    return item;
  })
});

const filterOutClusterIp = data => ({
  ...data,
  [state.itteratingKey]: data[state.itteratingKey].map(item => {
    if(item.spec && item.spec.clusterIP) {
      // do not delete uids from replication controllers
      delete item.spec.clusterIP;
    }
    return item;
  }),
});

const writeToFile = (data, filePath) => {
  const yamlText = yaml.safeDump(data);
  writeFile(filePath, yamlText);
}

filterUselessAttributes();