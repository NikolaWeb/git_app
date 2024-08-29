import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
    const query = req.query; 

    try {
        const posts = await prisma.post.findMany({
            where: {
                city: query.city || undefined,
                engType: query.engType || undefined,
                vclType: query.vclType || undefined,
                brand: query.brand || undefined,
                model: query.model || undefined,
                price: {
                    gte: parseInt(query.minPrice) || 0,
                    lte: parseInt(query.maxPrice) || 10000000
                }
            }
        });
        // setTimeout(() => {  
            res.status(200).json(posts);
        // }, 1000);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get posts!" });
    }
};

export const getPost = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                postDetail: true,
                user: {
                    select: {
                        id: req.params.userId,
                        username: true,
                        avatar: true
                    }
                }
            }
        });

        const token = req.cookies?.token;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (unsavedPost, payload) => {
                if (unsavedPost) {
                    return res.status(401).json({ message: "Invalid token" });
                }
                const saved = await prisma.savedPost.findUnique({
                    where: {
                        userId_postId: {
                            postId: id,
                            userId: payload.id
                        }
                    }
                });
                res.status(200).json({ ...post, isSaved: saved ? true : false });
            });
        } else {
            res.status(200).json({ ...post, isSaved: false });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get post!" });
    }
};

export const addPost = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;
        
    try {
        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail: {
                    create: body.postDetail
                }
            }
        });
        res.status(200).json(newPost);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to add post!" });
    }
};

export const updatePost = async (req, res) => {
   const id = req.params.id;
   const tokenUserId = req.userId;
   const body = req.body;
   
   try {
       const post = await prisma.post.findUnique({
            where: { id }
       });

       if(!post || post.userId !== tokenUserId) return res.status(403).json({ message: "Not Authorized" });

       const updatedPost = await prisma.post.update({
            where: { id },
            include: {
                postDetail: true
            },
            data: {
                ...body.postData,
                postDetail: {
                    update: body.postDetail
                }
            }
       });

       res.status(200).json(updatedPost);
    
   } catch (err) {
       console.log(err);
       res.status(500).json({ message: "Failed to update post!" });
   }
};

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    
    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        });
        if(post.userId !== tokenUserId) return res.status(403).json({ message: "Not Authorized" });

        await prisma.post.delete({
            where: { id }
        });
        res.status(200).json({ message: "Post Deleted" })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete post!" });
    }
};

