//comment out following line for browser-only usage
import opCodes from './opcodes.js'

var stack = []

var teal = `#Pragma version 5
int 1
int 2
//test comment
int 3
int 4
//test comment2
int 5
+`


const removals = [
    "#",
    "//"
]

function parse(program) {
    let pArray = program.split("\n")
    let newArray = []
    pArray.forEach(line => {
        let keep = true
        removals.forEach(phrase => {
            if (line.includes(phrase)) {
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
        if (opCodes[opCode].inline === true){
            elements.shift()
            let args = elements
            opCodes[opCode].op(stack,args)
        }
        else{
            let numArgs = opCodes[opCode].pops.number
            console.log("numArgs")
            console.log(numArgs)
            let args = []
            for (let i = 0; i < numArgs; i++){
                args.push(stack.pop())
            }
            console.log("Args:")
            console.log(args)
            opCodes[opCode].op(stack,args)
            console.log("Stack after opcode " + opCode + ":")
            console.log(stack)
        }
    })
}


testTeal(teal)