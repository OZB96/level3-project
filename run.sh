#!/bin/bash
kubectl get pods -n test | grep -oe '\([0-9.]\/[0-9.]\)' | while read -r line ; do
if [ $line = "1/1" || $line = "2/2"]
then
	echo correct.
	pwd
fi
done
