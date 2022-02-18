import {accounts, app_global} from './main.js'

const opCodes = {
    int: {
        pushes: {
            number: 1,
            type: "uint64"
        },
        pops: {
            number: 0,
            type: "uint64"
        },
        op: function(stack,args){stack.push(parseInt(args[0]))},
        inline: true
    },
    "+": {
        pushes: {
            number: 1,
            type: "uint64"
        },
        pops: {
            number: 2,
            type: "uint64"
        },
        op: function(stack,args){stack.push(args[0] + args[1] )},
        inline: false
    },
    "-": {
        pushes: {
            number: 1,
            type: "uint64"
        },
        pops: {
            number: 2,
            type: "uint64"
        },
        op: function(stack,args){stack.push(args[0] - args[1] )},
        inline: false
    },
    "*": {
        pushes: {
            number: 1,
            type: "uint64"
        },
        pops: {
            number: 2,
            type: "uint64"
        },
        op: function(stack,args){stack.push((args[0] * args[1] ))},
        inline: false
    },
    "/": {
        pushes: {
            number: 1,
            type: "uint64"
        },
        pops: {
            number: 2,
            type: "uint64"
        },
        op: function(stack,args){stack.push(Math.round(args[0] / args[1] ))},
        inline: false
    },
    byte: {
        pushes: {
            number: 1,
            type: "any"
        },
        pops: {
            number: 0,
            type: "string"
        },
        op: function(stack,args){
            args[0] = args[0].replace(/"/g, "")
            stack.push(args[0])
        },
        inline: true
    },
    store: {
        pushes: {
            number: 0,
            type: "any"
        },
        pops: {
            number: 1,
            type: "any"
        },
        op: function(stack,args,storage){
            let index = parseInt(args[0])
            let sindex = stack.length - 1
            storage[index] = stack[sindex]
        },
        inline: true
    },
    load: {
        pushes: {
            number: 1,
            type: "any"
        },
        pops: {
            number: 0,
            type: "any"
        },
        op: function(stack,args,storage){
            let index = parseInt(args[0])
            stack.push(storage[index])
        },
        inline: true
    },
    app_local_get: {
        pushes: {
            number: 1,
            type: "any"
        },
        pops: {
            number: 2,
            type: "any"
        },
        op: function(stack,args){
            stack.push(accounts[args[0]][args[1]])
        },
        inline: false
    },
    app_global_get: {
        pushes: {
            number: 1,
            type: "any"
        },
        pops: {
            number: 1,
            type: "any"
        },
        op: function(stack,args){
            stack.push(app_global[args[0]])
        },
        inline: false
    },
    app_local_put: {
        pushes: {
            number: 0,
            type: "any"
        },
        pops: {
            number: 3,
            type: "any"
        },
        op: function(stack,args,undefined,accounts){
            let arg1 = args[0]
            let arg2 = args[1]
            let arg3 = args[2]
            accounts[arg1][arg2] = arg3
        },
        inline: false
    },
    app_global_put: {
        pushes: {
            number: 0,
            type: "any"
        },
        pops: {
            number: 2,
            type: "any"
        },
        op: function(stack,args,undefined,accounts,app_global){
            app_global[args[0]] = args[1]
        },
        inline: false
    },
}

export default opCodes