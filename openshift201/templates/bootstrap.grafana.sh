oc process -f grafana_template.yaml  \
    -p GRAFANA_SERVICE_NAME=dkelsey-grafana \
    -p LOKI_SERVICE_NAME=dkelsey-loki \
    -p PROMETHEUS_SERVICE_NAME=dkelsey-prometheus \
    -p ROUTE_SUBDOMAIN=pathfinder.gov.bc.ca \
    -p NAMESPACE=s4g19x-dkelsey-openshift201-may2019-dev \
    | oc apply -f -
