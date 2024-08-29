import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
    const tokenUserId = req.userId;    

    try {
        const chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [tokenUserId]
                },
            },
        });

        const chatResponses = await Promise.all(chats.map(async (chat) => {
            const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

            if(!receiverId) {
                return {
                    ...chat,
                    receiver: null,
                };
            }

            const receiver = await prisma.user.findUnique({
                where: {
                    id: receiverId
                },
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                },
            });

            return {
                ...chat,
                receiver,
            };
        }));
        
        res.status(200).json(chatResponses);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get chats!" });
    }
};

export const getChat = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId]
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        });
        await prisma.chat.update({
            where: {
                id: req.params.id
            },
            data: {
                seenBy: {
                    push: [tokenUserId]
                }
            }
        });

        res.status(200).json(chat)
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get chat!" });
    }
};

export const addChat = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const newChat = await prisma.chat.create({
            data: {
                userIDs: [
                    tokenUserId,
                    req.body.receiverId
                ]
            }
        });

        res.status(200).json(newChat);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to add chat!" });
    }
};

export const readChat = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const chat = await prisma.chat.update({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId]
                }
            },
            data: {
                seenBy: {
                    set: [tokenUserId]
                }
            }
        });

        res.status(200).json(chat);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to read chat!" });
    }
};

export const deleteChat = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId]
                }
            }
        });

        if(!chat) return res.status(404).json({ message: "Chat not found!" });

        // Delete associated messages first
        await prisma.message.deleteMany({
            where: {
                chatId: req.params.id
            }
        });

        // Then delete the chat
        await prisma.chat.delete({
            where: {
                id: req.params.id
            }
        });
        
        res.status(200).json({ message: "Chat deleted successfully!" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete chat!" });
    }
};