#Program that converts weights and measures
from tkinter import *

#Conversion functions
def lb_conversion():
    lb=float(e1.get())
    e2.delete(0,END)
    e2.insert(END,round(lb*16,2))
    e3.delete(0,END)
    e3.insert(END,round(lb*0.4536,2))
    e4.delete(0,END)
    e4.insert(END,round(lb*453.6,2))

def oz_conversion():
    oz=float(e2.get())
    e1.delete(0,END)
    e1.insert(END,round(oz*0.0625,2))
    e3.delete(0,END)
    e3.insert(0,round(oz*0.0283495,2))
    e4.delete(0,END)
    e4.insert(END,round(oz*28.3495,2))

def kg_conversion():
    kg=float(e3.get())
    e1.delete(0,END)
    e1.insert(END,round(kg*2.205,2))
    e2.delete(0,END)
    e2.insert(END,round(kg*35.274,2))
    e4.delete(0,END)
    e4.insert(END,round(kg*1000,2))

def gram_conversion():
    gram=float(e4.get())
    e1.delete(0,END)
    e1.insert(END,round(gram*0.002205,2))
    e2.delete(0,END)
    e2.insert(END,round(gram*0.035274,2))
    e3.delete(0,END)
    e3.insert(END,round(gram*0.001,2))

def inch_conversion():
    inch=float(e5.get())
    e6.delete(0,END)
    e6.insert(END,round(inch*0.08333333,2))
    e7.delete(0,END)
    e7.insert(END,round(inch*25.4,2))
    e8.delete(0,END)
    e8.insert(END,round(inch*2.54,2))

def foot_conversion():
    foot=float(e6.get())
    e5.delete(0,END)
    e5.insert(END,round(foot*12,2))
    e7.delete(0,END)
    e7.insert(END,round(foot*304.8,2))
    e8.delete(0,END)
    e8.insert(END,round(foot*30.48,2))

def mm_conversion():
    mm=float(e7.get())
    e5.delete(0,END)
    e5.insert(END,round(mm*0.03937,2))
    e6.delete(0,END)
    e6.insert(END,round(mm*0.00328084,2))
    e8.delete(0,END)
    e8.insert(END,round(mm*0.1,2))

def cm_conversion():
    cm=float(e8.get())
    e5.delete(0,END)
    e5.insert(END,round(cm*0.3937,2))
    e6.delete(0,END)
    e6.insert(END,round(cm*0.0328,2))
    e7.delete(0,END)
    e7.insert(END,round(cm*10,2))

def f_conversion():
    f=float(e9.get())
    e10.delete(0,END)
    e10.insert(END,round((f-32)*(5/9),1))

def c_conversion():
    cel=float(e10.get())
    e9.delete(0,END)
    e9.insert(END,round(cel*(9/5)+32,1))

#Creates GUI window
window=Tk()
window.title("Coversion Calculator")

#Creates labels
Label(window,text="Conversion Calculator",bg="lightgray",width=25,height=2,
font="Helvetica 13 bold").grid(row=0,columnspan=3)
Label(window,text="").grid(row=1)
Label(window,text="Weight",font="bold").grid(row=2,columnspan=3)
Label(window,text="lb").grid(row=3,sticky=E)
Label(window,text="oz").grid(row=4,sticky=E)
Label(window,text="kg").grid(row=5,sticky=E)
Label(window,text="gram").grid(row=6,sticky=E)
Label(window,text="").grid(row=7)
Label(window,text="Length",font="bold").grid(row=8,columnspan=3)
Label(window,text="inch").grid(row=9,sticky=E)
Label(window,text="foot").grid(row=10,sticky=E)
Label(window,text="mm").grid(row=11,sticky=E)
Label(window,text="cm").grid(row=12,sticky=E)
Label(window,text="").grid(row=13)
Label(window,text="Temperature",font="bold").grid(row=14,columnspan=3)
Label(window,text="f").grid(row=15,sticky=E)
Label(window,text="c").grid(row=16,sticky=E)
Label(window,text="").grid(row=17)

#Creates input boxes
e1=Entry(window)
e1.grid(row=3,column=1)

e2=Entry(window)
e2.grid(row=4,column=1)

e3=Entry(window)
e3.grid(row=5,column=1)

e4=Entry(window)
e4.grid(row=6,column=1)

e5=Entry(window)
e5.grid(row=9,column=1)

e6=Entry(window)
e6.grid(row=10,column=1)

e7=Entry(window)
e7.grid(row=11,column=1)

e8=Entry(window)
e8.grid(row=12,column=1)

e9=Entry(window)
e9.grid(row=15,column=1)

e10=Entry(window)
e10.grid(row=16,column=1)

#Creates convert buttons
Button(window,text="Convert",command=lb_conversion).grid(row=3,column=2)
Button(window,text="Convert",command=oz_conversion).grid(row=4,column=2)
Button(window,text="Convert",command=kg_conversion).grid(row=5,column=2)
Button(window,text="Convert",command=gram_conversion).grid(row=6,column=2)
Button(window,text="Convert",command=inch_conversion).grid(row=9,column=2)
Button(window,text="Convert",command=foot_conversion).grid(row=10,column=2)
Button(window,text="Convert",command=mm_conversion).grid(row=11,column=2)
Button(window,text="Convert",command=cm_conversion).grid(row=12,column=2)
Button(window,text="Convert",command=f_conversion).grid(row=15,column=2)
Button(window,text="Convert",command=c_conversion).grid(row=16,column=2)

window.mainloop()