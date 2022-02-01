const opCodes = {
    int: {
        pushes: {
            number: 1,
            type: "integer"
        },
        pops: {
            number: 0,
            type: undefined
        },
        op: function(stack,args){stack.push(parseInt(args[0]))},
        inline: true
    },
    "+": {
        pushes: {
            number: 1,
            type: "integer"
        },
        pops: {
            number: 2,
            type: undefined
        },
        op: function(stack,args){stack.push(args[0] + args[1] )},
        inline: false
    }
}

export default opCodes