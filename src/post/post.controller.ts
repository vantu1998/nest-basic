import { FineOneParams } from './../utils/findOneParams';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostService } from './post.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import CreatePostDto from './dto/createPost.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param() id: FineOneParams) {
    return this.postService.getById(Number(id));
  }

  @Post()
  createPost(@Body() post: CreatePostDto) {
    return this.postService.create(post);
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postService.update(Number(id), post);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.delete(Number(id));
  }
}
