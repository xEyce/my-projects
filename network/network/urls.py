
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("createPost/", views.create_post, name="create_post"),
    path("profilePage/<str:username>/", views.profile_page, name="profile_page"),
    path("followingPage/", views.following_page, name="following_page"),
    path("edit_post/", views.edit_post, name="edit_post"),
    path("toggle_like/<int:post_id>/", views.toggle_like, name="toggle_like"),
]
