import sys

def count(n):
    countdown = n

    while countdown > 0:
        print ('CountDown = ', countdown)
        countdown = countdown - 1

if __name__ == "__main__":
    print(f"Arguments count: {len(sys.argv)}")
    for i, arg in enumerate(sys.argv):
        print(f"Argument {i:>3}: {arg}")
    count(int(float(sys.argv[1])))