from django.db import models


class Task(models.Model):
    task = models.CharField(max_length=250, db_index=True, verbose_name="Task")
    is_completed = models.BooleanField(default=False, verbose_name="Is completed ?")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.task}"
