oc process -f prometheus_template.yaml \
    -p PROMETHEUS_SERVICE_NAME=dkelsey-prometheus \
    -p PROMETHEUS_PVC_SIZE=2Gi \
    -p NAMESPACE=s4g19x-dkelsey-openshift201-may2019-dev \
    | oc apply -f -
