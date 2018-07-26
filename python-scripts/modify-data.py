#!/usr/bin/env python3
import sys, json

#read data sent from std_in, in this case from the js file.  
def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def main():
    lines = read_in()

    # Sum  of all the items in the providen array
    total_sum_inArray = 0
    for item in lines:
    	if item.isdigit():
        	total_sum_inArray += int(item)
        else:
        	print "{0} is not an integer.".format(item)

    #return the sum to the output stream
    print total_sum_inArray

# Start process
if __name__ == '__main__':
    main()
