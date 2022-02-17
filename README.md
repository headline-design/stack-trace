# stack-trace
A JavaScript tool for debugging Algorand TEAL

```bash
Supported OpCodes:
[
  'int',           '+',
  '-',             '*',
  '/',             'byte',
  'store',         'load',
  'app_local_get', 'app_global_get',       
  'app_local_put', 'app_global_put'        
]
```

## Usage

The code currently is run in the command line, but we will be porting it to a browser app soon. 

To test your teal code, paste it into the variable `teal` in `main.js`, save, then in command line, enter:

```bash
node main.js
```

## Adding opCodes

To add more opCodes, edit the object in `opcodes.js`