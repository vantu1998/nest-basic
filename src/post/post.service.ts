import { PostNotFoundException } from './exception/postNotFound.exception';
import { UpdatePostDto } from './dto/updatePost.dto';
import { CreatePostDto } from './dto/createPost.dto';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Post from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  getAllPosts() {
    return this.postRepository.find();
  }

  async getById(id: number) {
    const post = await this.postRepository.findOne(id);
    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }

  async create(postDto: CreatePostDto) {
    const newPost = await this.postRepository.create(postDto);
    await this.postRepository.save(newPost);
    return newPost;
  }

  async update(id: number, post: UpdatePostDto) {
    await this.postRepository.update(post.id, post);
    const updatePost = await this.postRepository.findOne(id);
    if (updatePost) {
      return updatePost;
    }
    throw new PostNotFoundException(id);
  }

  async delete(id: number) {
    const deletePost = await this.postRepository.delete(id);
    if (!deletePost.affected) {
      throw new PostNotFoundException(id);
    }
    return HttpStatus.OK;
  }
}
