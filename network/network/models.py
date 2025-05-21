from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    
    pass

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="author")
    content = models.CharField(max_length=500)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} posted on {self.date}"
    
    def like_count(self):
        return self.likes.count()
    

class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="user_follower")
    followed = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="user_followed")

    def __str__(self):
        return f"{self.follower} is now following {self.followed}"
    

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="likes")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True, related_name="likes")

    class Meta:
        unique_together = ('user', 'post')
    
    def __str__(self):
        return f"{self.user} liked the post of {self.post.user}"

    