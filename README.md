# pontifex

## description
pontifex is a tool that converts osc messages to midi messages. 

please note that this is a work in progress
we use it for the upcoming klanglichtstrom performance, values are still hard coded, later a dynamic configuration feature will be added

* it listens on upd port 9010
* only accepts messages with address /kls/io/crank
* sends the first osc argument (value: 0-127) on midi channel 10, control 1