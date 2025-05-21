from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.core.paginator import Paginator

from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt

from .models import User, Post, Follow, Like
from django.shortcuts import get_object_or_404


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

def index(request):
    posts = Post.objects.all().order_by('-date')
    paginator = Paginator(posts, 10)

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, "network/index.html", {
         "posts": page_obj
    })

def create_post(request):
    if request.method == "POST":
        user = request.user
        content = request.POST['content']

        post = Post(
            user = user,
            content = content,
        )
        post.save()

        return HttpResponseRedirect(reverse('index'))
    
def profile_page(request, username):
    user = User.objects.get(username=username)
    posts = Post.objects.filter(user=user).order_by('-date')

    if request.method == "POST":
        if 'follow' in request.POST:
            new_follower = Follow(
                follower = request.user,
                followed = user
            )
            new_follower.save()
        elif 'unfollow' in request.POST:
            Follow.objects.filter(follower=request.user, followed=user).delete()


    is_following = Follow.objects.filter(follower=request.user, followed=user).exists()
    count_followers = Follow.objects.filter(followed=user).count()
    count_following = Follow.objects.filter(follower=user).count()
              

    return render(request, "network/profile_page.html" ,{
        "username": user,
        "posts": posts,
        "is_following": is_following,
        "followers": count_followers,
        "following": count_following
    })

def following_page(request):
    user = request.user
    following = Follow.objects.filter(follower=user).values_list('followed', flat=True)
    posts = Post.objects.filter(user__in=following).order_by('-date')

    """ following1 = Follow.objects.filter(follower=user)
    posts1 = Post.objects.all()
    following_list = []
    for post in posts1:
        for followed in following1:
            if followed.followed == post.user:
                following_list.append(post)
    """


    return render(request, "network/following_page.html", {
         "posts": posts
    })


@csrf_exempt  # Use this only for development; it's best to use CSRF tokens in production
@require_POST
def edit_post(request):
    post_id = request.POST.get("post_id")
    new_content = request.POST.get("content")

    try:
        post = Post.objects.get(id=post_id, user=request.user)
        post.content = new_content
        post.save()
        return JsonResponse({"success": True, "message": "Post updated successfully"})
    except Post.DoesNotExist:
        return JsonResponse({"success": False, "message": "Post not found or permission denied"})
    
@csrf_exempt
@require_POST
def toggle_like(request, post_id):
    if request.method == "POST" and request.user.is_authenticated:
        post = get_object_or_404(Post, id=post_id)
        like, created = Like.objects.get_or_create(user=request.user, post=post)

        if created:
            # New like created
            is_liked = True
        else:
            # Like exists, so we remove it (unlike)
            like.delete()
            is_liked = False

        # Send back updated like count and status
        return JsonResponse({
            "success": True,
            "is_liked": is_liked,
            "like_count": post.like_count()
        })

    return JsonResponse({"success": False, "error": "Invalid request."})