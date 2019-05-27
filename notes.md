## What is the average flight speed velocity of an unladen swallow?

African or European?

## GITOPS

### How do i export initial tempaltes from an existing project ?

> this feature is deprecating
`oc export all --as-template=new-tmp > new-tmpl.yaml`

`oc export svg,dc,route --as-template=filtered-tmp -l FOO=BAR > filtered-tmp.yaml`

to export an individual object manifest file
`oc export blah..`


### Object manifests vs templates

Manifests should be used for secrets/configmaps/pvcs 


## oc create vs oc apply

oc create will create a brand new object, if one exists it will error out
apply will is more of an _upsert_ with openshift objects

oc create should pretty much nly be used to create things the first time, apply should be used thereign


__if you have parameters that are needed in the object__ oc process and template and pipe into apply

`oc process -f foo.yml -p foo=bar | oc apply -f .`