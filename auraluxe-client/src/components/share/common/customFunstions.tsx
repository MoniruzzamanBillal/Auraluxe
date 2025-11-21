export const finishSelect = (data: any) => {
  const result = data.map((x: any) => {
    return { id: x._id, label: x.name };
  });
  return result;
};
