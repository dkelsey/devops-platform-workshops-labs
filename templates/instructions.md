## Creating From Templates

## First assign the template to your name space

`oc apply -f [template file name]`

## Then process the template and apply
`oc process [template-name] -p {param1} -p {param2} | oc apply -f -`