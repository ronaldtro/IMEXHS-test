rod = {
    "A": [],
    "B": [],
    "C": []
}
output = {"state": 1, "data": []}
movCounter = 1

def move(n, origin, destiny):

    global movCounter
    global output
    movCounter = movCounter+1

    originDisk = tuple
    destinyDisk = tuple

    if rod[origin]:
        originDisk = rod[origin][-1]

    if rod[destiny]:
        destinyDisk = rod[destiny][-1]

    if originDisk[1] == destinyDisk[1]:
        message = "Impossible to complete the transfer"

        if output["state"] != -1:
            output["state"] = -1

        output["data"].append(message)

        return

    rod[origin].pop()
    rod[destiny].append(originDisk)

    output["data"].append((n, origin, destiny))

def game(n, origin, destiny, aux):
    global movCounter

    if n == 1:
        move(n, origin, destiny)

    else:
        game(n - 1, origin, aux, destiny)
        move(n, origin, destiny)
        game(n - 1, aux, destiny, origin)

def main(n, disks):

    if (n >= 1 and n <= 8) == False:
        print("Oops! 1 =< n <= 8")
        return

    if (len(disks) != n):
        print("Oops! disks amount have to equal to 'n' ")
        return

    rod["A"] = disks
    
    game(n, "A", "C", "B")

    if (output["state"] == -1):
        print(output["state"])
    else:
        print(output["data"])

main(4, [(4, "red"), (3, "blue"), (2, "red"), (1, "green")])