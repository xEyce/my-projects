from django.shortcuts import render
from . import util
from markdown2 import Markdown
import random


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def converter(title):
    markdown = Markdown()
    content = util.get_entry(title)
    if content == None:
        return None
    else:
        return markdown.convert(content)
    

def entry_page(request, title):
    entry = converter(title)
    if entry is not None:
        return render(request, "encyclopedia/entry_page.html", {
                "title": title.capitalize(),
                "entry": entry
            })
    else:
        return render(request, "encyclopedia/error_page.html", {
            "message": "Entry not Found"
        })
    
def search(request):
    if request.method == "POST":
        user_search = request.POST["q"]
        entry = converter(user_search)
        if entry is not None:
            return render(request, "encyclopedia/entry_page.html", {
                "title": user_search.capitalize(),
                "entry": entry
            })
        else:
            entries = util.list_entries()
            search_list = []
            for entry in entries:
                if user_search.lower() in entry.lower():
                    search_list.append(entry)
            return render(request, "encyclopedia/search_page.html", {
                "search_list": search_list,
                "message": "NO MATCH"
            })
            
    
def new_page(request):
    if request.method == "GET":
        return render(request, "encyclopedia/new_page.html")
    else:
        title = request.POST["title"]
        content = request.POST["content"]
        titleExist = util.get_entry(title)
        if titleExist != None:
            return render(request, "encyclopedia/error_page.html", {
                "message": "Page Already Exist"
            })
        else:
            util.save_entry(title, content)
            entry = converter(title)
            return render(request, "encyclopedia/entry_page.html", {
                "title": title,
                "entry": entry,
                "new_title": title
            })
        
def edit_page(request):
    if request.method == "POST":
        title = request.POST["title"]
        content = util.get_entry(title)

    return render(request, "encyclopedia/edit_page.html", {
        "title": title,
        "entry": content
    })

def save_page(request):
    if request.method == "POST":
        title = request.POST["title"]
        content = request.POST["content"]
        util.save_entry(title, content)
        entry = converter(title)
        return render(request, "encyclopedia/entry_page.html", {
                "title": title,
                "entry": entry
        })
    

def random_page(request):
    entries = util.list_entries()
    random_entry = random.choice(entries)
    entry = converter(random_entry)
    return render(request, "encyclopedia/random_page.html", {
        "random_entry": entry
    })


    