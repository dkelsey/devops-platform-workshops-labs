oc process -f loki_template.yaml \
  -p LOKI_SERVICE_NAME=dkelsey-loki \
  | oc apply -f -
