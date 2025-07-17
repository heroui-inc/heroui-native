export const hasCustomElement = (
  children: React.ReactNode,
  displayName: string
) => {
  return children && Array.isArray(children)
    ? children.some((child: any) => child?.type?.displayName === displayName)
    : (children as any)?.type?.displayName === displayName;
};
