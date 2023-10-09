import { Box, Stack } from "@mui/material";

interface RootProps {
  children: React.ReactNode;
}
const Root: React.FC<RootProps> = (props) => {
  return (
    <Box
      component="dl"
      sx={{
        display: "flex",
        flexFlow: "row",
        flexWrap: "wrap",
        border: "1px solid #eaeaea",
        borderRadius: "0.5rem",
      }}
      {...props}
    />
  );
};
interface ItemProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
  font?: "normal" | "monospace";
}
const Item: React.FC<ItemProps> = ({ icon, title, font, children }) => {
  return (
    <>
      <Box
        component="dt"
        sx={{
          flex: "0 0 11rem",
          display: "flex",
          alignItems: "center",
          color: "rgba(0, 0, 0, 0.75)",
          fontWeight: 500,
          lineHeight: 1.25,
          padding: "0.375em 0.75rem",
          "&::after": {
            content: '":"',
          },
          "& svg": {
            verticalAlign: "middle",
            height: "0.875em",
            width: "0.875em",
            marginRight: "0.25em",
            paddingBottom: "0.125em",
          },
          ":not(:last-of-type)": {
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        {icon}
        <span>{title}</span>
      </Box>
      <Box
        component="dd"
        sx={{
          flex: "0 0 calc(100% - 11rem)",
          padding: "0.375em 0.25rem 0.375em 0",
          margin: 0,
          fontFamily:
            font === "monospace" ? '"Roboto Mono", monospace' : "inherit",
          fontWeight: 700,
          ":not(:last-of-type)": {
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          },
          display: "flex",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </>
  );
};

const DetailsList = Root as typeof Root & {
  Item: typeof Item;
};
DetailsList.Item = Item;

export default DetailsList;
