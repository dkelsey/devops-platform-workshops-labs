## Template Cleaning Tool
A helper to convert `oc get [objects]` call into a template

A small node js script is provided to strip away useless defaults that are generated from a command
like `oc get all --export=true -o yaml > somefile.yaml`

This command pulls down all objects including their preset metadata which is useless in the context of a
reusable name space. 

## What does the Node Script do?

Strips out:
- clusterIp references
- metadata.creationTimestamp
- metadata.selfLink
- metadata.namespace
- metadata.resourceVersion
- uids
- useless openshift objects like replica sets and replication controllers