const plainPayLoadMaker = (user) => {
    let payload = {
        name: user.name,
        email: user.email,
        id: user._id,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        profilePhoto: user.profilePhoto,
    }
    return payload;
}

export default plainPayLoadMaker;