from tkinter import *


def calculate():
    # Get all inputs from GUI
    age = float(age_input.get())
    weight = float(weight_input.get())
    chest = float(chest_input.get())
    abdominal = float(abdominal_input.get())
    thigh = float(thigh_input.get())

    # Formula for body fat
    fat_total = chest + abdominal + thigh
    fat_squared = fat_total * fat_total
    density = (
        1.10938
        - (0.0008267 * fat_total)
        + (0.0000016 * fat_squared)
        - (0.0002574 * age)
    )
    body_fat = (4.57 / density - 4.142) * 100

    # Insert results onto window
    fat_mass = round(weight * body_fat * 0.01, 1)
    body_fat_label.configure(text=round(body_fat, 1))
    fat_mass_label.configure(text=f"{fat_mass} {w.get()}")
    lean_mass_label.configure(text=f"{round(weight-fat_mass,1)} {w.get()}")


# ----- Window Creation -----
root = Tk()
root.title("Body Fat Calculator")

# ----- Body Fat Area -----
Label(
    root,
    text="Body Fat Calculator For Men",
    font="Helvetica 10 bold",
    bg="lightgrey",
    width=45,
    height=2,
).grid(row=0, columnspan=3)
Label(root).grid(row=1)

Label(root, text="AGE").grid(row=2)
age_input = Entry(root)
age_input.grid(row=3)

Label(root, width=8, pady=3).grid(row=4, column=1)

w = StringVar()
Label(root, text="WEIGHT").grid(row=5)
weight_input = Entry(root)
weight_input.grid(row=6)
Radiobutton(root, text="lb", var=w, value="lb", width=8).grid(row=7, sticky=W)
Radiobutton(root, text="kg", var=w, value="kg", width=8).grid(row=7, sticky=E)
w.set("lb")


# Skinfold Inputs
Label(root, text="CHEST SKINFOLD").grid(row=2, column=2)
chest_input = Entry(root)
chest_input.grid(row=3, column=2)

Label(root, text="ABDOMINAL SKINFOLD").grid(row=5, column=2)
abdominal_input = Entry(root)
abdominal_input.grid(row=6, column=2)

Label(root, text="THIGH SKINFOLD").grid(row=8, column=2)
thigh_input = Entry(root)
thigh_input.grid(row=9, column=2, pady=(0, 20))

Button(
    root,
    text="Calculate",
    width=12,
    font="Helvetica 10 bold",
    bg="#DEDEDE",
    command=calculate,
).grid(row=11)

# ----- Results Area -----
Label(
    root, text="Results", font="Helvetica 10 bold", bg="lightgrey", width=45, height=2
).grid(row=13, columnspan=3, pady=(20, 10))
Label(root, text="Your body fat percentage is: ").grid(row=15, sticky=E)
Label(root, text="Your fat mass is: ").grid(row=16, sticky=E)
Label(root, text="Your lean mass is: ").grid(row=17, sticky=E)

body_fat_label = Label(root, font="Helvetica 10 bold")
body_fat_label.grid(row=15, column=1, sticky=W)

fat_mass_label = Label(root, font="Helvetica 10 bold")
fat_mass_label.grid(row=16, column=1, sticky=W)

lean_mass_label = Label(root, font="Helvetica 10 bold")
lean_mass_label.grid(row=17, column=1, sticky=W)

Button(
    root,
    text="EXIT",
    font="Helvetica 10 bold",
    bg="#DEDEDE",
    padx=20,
    command=root.destroy,
).grid(row=19, columnspan=3, pady=(10, 20))

root.mainloop()
