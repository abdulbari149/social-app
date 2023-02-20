import { getModelForClass, modelOptions } from '@typegoose/typegoose';
import { IData, IModel } from './interface';

@modelOptions({ schemaOptions: { collection: 'posts', timestamps: true } })
class PostsSchema {


}

export type Post = IModel<PostsSchema>;
export type PostData = IData<PostsSchema>;

const PostsModel = getModelForClass(PostsSchema);
export default PostsModel