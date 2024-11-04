import { Component, OnInit, WritableSignal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { DatePipe } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

import { BlogService } from "../services/blog.service";
import { Blog } from "../interfaces/blog.model";

@Component({
  selector: "app-blog-details",
  standalone: true,
  imports: [DatePipe, MatTableModule, MatButtonModule, MatCardModule],
  templateUrl: "./blog-details.component.html",
  styleUrl: "./blog-details.component.css",
})
export class BlogDetailsComponent implements OnInit {
  blog$ = {} as WritableSignal<Blog>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get("id");
    if (blogId) {
      this.blog$ = this.blogService.blog$;
      this.blogService.getBlogById(blogId);
    }
  }

  deleteBlog(): void {
    this.blogService.deleteBlog(this.blog$()._id!).subscribe({
      next: () => {
        this.router.navigate(["/"]);
      },
      error: (error) => {
        alert("Failed to delete blog");
        console.log(error);
      },
    });
    this.blogService.getBlogs();
  }
}