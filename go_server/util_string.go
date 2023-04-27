package main

import (
	"reflect"
	"strconv"
	"strings"
)

func trimString(s string) string {
	return strings.Trim(stringlize(s), " 	")
}

func stringlize(obj interface{}) string {
	switch reflect.TypeOf(obj).Kind() {
	case reflect.String:
		return obj.(string)
	case reflect.Int:
		return strconv.Itoa(obj.(int))
	default:
		return ""
	}
}

func string2int(str string) int {
	if len(str) > 0 {
		num, _ := strconv.Atoi(str)
		return num
	}
	return 0
}
