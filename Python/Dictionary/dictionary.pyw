from tkinter import *
import json

data = json.load(open("data.json"))

# ----- Search Function -----
def search_word():
    """ This will search for and display the word that is searched. """
    definition.delete(1.0, END)
    word = word_box.get().lower()

    count = 1
    if word in data:
        for i in data[word]:
            definition.insert(END, f"{count}. {i}\n")
            count += 1
    else:
        definition.insert(END, "That is not a word")


# ----- Windows Creation -----
root = Tk()
root.title("Dictionary")

# ----- Label Creation -----
Label(
    root,
    text="Dictionary",
    font="Helvetica 15 bold",
    bg="lightgray",
    width=45,
    height=2,
).grid(row=0, columnspan=3)
Label(root, text="ENTER WORD:", font="Helvetica 10 bold").grid(row=1, pady=10, sticky=E)

# ----- Entry Box Creation -----
word_box = Entry(root, width=25)
word_box.grid(row=1, column=1, pady=15, sticky=W)

# ----- Search Button Creation -----
search = Button(
    root,
    text="search",
    font="Helvetica 10 bold",
    bg="#DEDEDE",
    width=15,
    command=search_word,
)
search.grid(row=1, column=2, sticky=W)

# ----- Definition Box Creation -----
definition = Text(root, wrap="word", width=60, height=10)
definition.grid(row=2, columnspan=3)

# ----- Exit Button Creation -----
Button(
    root,
    text="EXIT",
    font="Helvetica 10 bold",
    width=20,
    bg="lightgray",
    command=root.destroy,
).grid(row=3, column=2, pady=10, sticky=W)

root.mainloop()
