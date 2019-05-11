from tkinter import *

#Function that claculate and displays BMI
def bmi_command():
    lbs=float(e1.get())
    height=float(e2.get()) * 12 + float(e3.get())
    bmi=(lbs*703)/(height*height)
    t1["text"]=round(bmi,2)


#Creates window
window=Tk()   
window.title("BMI Calculator")

#Creates labels
Label(window,text="Body Mass Index (BMI)",width=30,bg="lightgray").grid(row=0,columnspan=5)
Label(window,text="Weight").grid(row=1)
Label(window,text="lbs").grid(row=2,column=1)
Label(window,text="Height").grid(row=3)
Label(window,text="ft").grid(row=4,column=1)
Label(window,text="inches").grid(row=4,column=3)
Label(window,text="Your BMI is:").grid(row=1,column=4)

#Creates text entry
e1=Entry(window,width=5)
e1.grid(row=2,column=0)

e2=Entry(window,width=5)
e2.grid(row=4)

e3=Entry(window,width=5)
e3.grid(row=4,column=2)

#Creates BMI text output
t1=Label(window,text="",height=1,width=7)
t1.grid(row=2,column=4)

#Creates submit button
Button(window,text="Submit",command=bmi_command).grid(row=4,column=4)

window.mainloop()