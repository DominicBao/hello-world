import xlrd
import xlwt
import sys
#-*- coding:utf-8 -*-

# open xlsx
book = xlrd.open_workbook("D:\\x.xlsx")
# open biao
sh = book.sheet_by_index(0)
# get sum hang
print (sh.nrows)
# get sum lie
print (sh.ncols)

num_name = sh.nrows-2;
sum = 0;
# get data to tempList
tempLIst = []
for i in range(1,sh.nrows):
    for j in range(5,sh.ncols):
        if(i > 1):
            #print (sh.cell_value(i, j))
            if(sh.cell_value(i, j) == 1):
                sum=sum+1
        else:
            break;

#get sum
sum_other = []
#get name
sum_name = []
for i in range(5,sh.ncols):
    sum1 = 0
    for j in range(1,sh.nrows):
        if(j == 1):
            sys.stdout.write(sh.cell_value(j,i))
            sum_name.append(sh.cell_value(j,i))
            #print "xxxxxx"
        else:
            if(sh.cell_value(j,i) == 1):
                sum1 = sum1 + 1
    print ("\n",sum1,"sssss")
    print("hit rate",(format((float(sum1) / float(num_name)), '.6f')))
    sum_other.append(sum1)

#output
print ("the data=",num_name," in this get",sum,"hit rate",(format((float(sum)/float(num_name)),'.6f')))

#write modular


#new xls
wb = xlwt.Workbook()

#new sheet
sh_new = wb.add_sheet("new_sheet")

#write data
for i in range(1, len(sum_name)+1):
    for j in range(0,3):
        if(j == 0):
            sh_new.write(i, j, sum_name[i-1])
        if(j == 1):
            sh_new.write(i, j, sum_other[i - 1])
        if(j == 2):
            sh_new.write(i, j, (format((float(sum_other[i - 1]) / float(num_name)), '.6f')))
        if(i == len(sum_name)):
            if(j==0):
                sh_new.write(i+1, j, num_name)
            if(j == 1):
                sh_new.write(i + 1, j, sum)
            if(j == 2):
                sh_new.write(i + 1, j, (format((float(sum)/float(num_name)),'.6f')))



print (sum_name[0])
print (sum_other[0])

sh_new.save("D:\\x.xlsx")
