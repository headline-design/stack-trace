//comment out following line for browser-only usage
import opCodes from './opcodes.js'

const progData = {

    stack: [0],
    index: 0,
    global: {
        Round: 12345
    },
    txns: [0],
    app_global: {
        depositAmount: 10000000000,
        staked: 9500000000
    },
    accounts: [
        { amt: 4000000000 }
    ],
    storage: [0,0,0,0,0],
    branch: false,
    branchTo: ""

}

var teal = `byte "staked"
app_global_get
int 0
byte "amt"
app_local_get
/
store 3
byte "depositAmount"
app_global_get
load 3
/
store 1
load 1
int 0
byte "amt"
app_local_get
+
store 0
int 1
bnz test
test:
byte "hello"
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

function testTeal(prgm) {
    let parsed = parse(prgm)
    for (let i = progData.index; i < parsed.length; i++) {

        let line = parsed[i]

        if (!progData.branch) {
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

            if (opCodes[opCode].inline) {

                let args = []

                if (numArgs > 0) {
                    console.log("multiple")
                    for (let i = 0; i < numArgs; i++) {
                        args.push(progData.stack.pop())
                    }
                    //args.reverse()
                }

                elements.shift()
                args = [...args,...elements]
                console.log("Args:")
                console.log(args)
                opCodes[opCode].op(progData, args)
            }
            else {
                let args = []
                for (let i = 0; i < numArgs; i++) {
                    args.push(progData.stack.pop())
                }
                args.reverse()
                console.log(args)
                opCodes[opCode].op(progData, args)
            }
            console.log("Stack after opcode " + opCode + ":")
            console.log(progData.stack)
            console.log("")

            console.log("Storage:")
            console.log(progData.storage)
        }
        else{
            if (line === progData.branchTo + ":"){
                progData.branch = false
            }
        }
    }

    console.log("App Global State:")
    console.log(progData.app_global)
    console.log("App Local State:")
    console.log(progData.accounts)
}


testTeal(teal)