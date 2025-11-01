n=int(input("enter the value of n:"))
for i in range(1,n):
    for j in range(1,n+n):
        if i <= j:
            print(j)
    print()