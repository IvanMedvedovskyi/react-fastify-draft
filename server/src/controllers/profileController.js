export const getProfile = async (request, reply) => {
  if (!request.session.user) {
    return reply.redirect("/auth/discord");
  }

  return {
    message: "Вы авторизованы!",
    user: request.session.user,
  };
};
