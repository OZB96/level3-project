#!/bin/bash
i=1
numberOfService=13
kubectl get pods -n test | grep -oe '\([0-9.]\/[0-9.]\)' | while read -r line ; do
i=$((++i))
if [ $line = "1/1" ] || [ $line = "2/2" ]
then
echo "service $(kubectl get pods -n test | sed -n ${i}p | cut -d ' ' -f 1) is running" 2> /dev/null 
numberOfService=$((--numberOfService))
fi
if [ $numberOfService -eq 0 ] 
then
echo "done"
break
fi
done

