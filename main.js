//comment out following line for browser-only usage
import opCodes from './opcodes.js'

var stack = []

let txns = []

export const app_global = {
    depositAmount: 200,
    staked: 240
}

export var accounts = [
    {amt: 150 }
]

var storage = []

var teal = `
int 0
byte "amt"
app_local_get
byte "depositAmount"
app_global_get
*
byte "staked"
app_global_get
/
int 0
byte "amt"
app_local_get
+
store 0
byte "staked"
byte "staked"
app_global_get
int 0
byte "amt"
app_local_get
-
app_global_put
`

const removals = [
    "#",
    "//"
]

console.log("Supported OpCodes:")
console.log(Object.keys(opCodes))

function parse(program) {
    let pArray = program.split("\n")
    let newArray = []
    pArray.forEach(line => {
        let keep = true
        removals.forEach(phrase => {
            if (line.includes(phrase) || line === "") {
                keep = false
            }
        })
        if (keep) {
            newArray.push(line)
        }
    })
    console.log("Operations:")
    console.log(newArray)
    return newArray
}

function testTeal(prgm){
    let parsed = parse(prgm)
    parsed.forEach(line => {
        line = line.trimEnd()
        let elements = line.split(" ")
        let opCode = elements[0]
        let numArgs = opCodes[opCode].pops.number
        console.log('\x1b[36m%s\x1b[0m', "OpCode:")
        console.log('\x1b[31m%s\x1b[0m', opCode)
        console.log("Pops:")
        console.log(numArgs)
        console.log("Type:")
        let type = opCodes[opCode].pops.type
        console.log(type)

        if (opCodes[opCode].inline === true) {
            elements.shift()
            let args = elements
            opCodes[opCode].op(stack,args,storage,accounts,app_global)
        }
        else{
            let args = []
            for (let i = 0; i < numArgs; i++){
                args.push(stack.pop())
            }
            args.reverse()
            console.log(args)
            opCodes[opCode].op(stack, args,storage,accounts,app_global)
        }
        console.log("Stack after opcode " + opCode + ":")
        console.log(stack)
        console.log("")
    })

    console.log("App Global State:")
    console.log(app_global)
    console.log("App Local State:")
    console.log(accounts[0])
}


testTeal(teal)