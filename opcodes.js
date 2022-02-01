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
    }
}

export default opCodes