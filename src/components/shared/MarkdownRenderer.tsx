import {
  Divider,
  Link,
  List,
  ListItem,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const MarkdownRenderer = ({ content }: { content: string }) => {
  const theme = useTheme();

  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => <Typography variant="h4" gutterBottom {...props} />,
        h2: ({ node, ...props }) => <Typography variant="h5" gutterBottom {...props} />,
        h3: ({ node, ...props }) => <Typography variant="h6" gutterBottom {...props} />,
        h4: ({ node, ...props }) => <Typography variant="h7" gutterBottom {...props} />,
        p: ({ node, ...props }) => <Typography variant="body1" paragraph {...props} />,
        a: ({ node, ...props }) => <Link color="primary" {...props} />,
        ul: ({ node, ...props }) => <List dense component="ul" {...props} />,
        ol: ({ node, ...props }) => <List dense component="ol" {...props} />,
        li: ({ node, ...props }) => <ListItem disableGutters {...props} />,
        hr: ({ node, ...props }) => <Divider sx={{ my: 2 }} {...props} />,
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline ? (
            <Paper elevation={2} sx={{ my: 2 }}>
              <SyntaxHighlighter
                language={match ? match[1] : 'text'}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </Paper>
          ) : (
            <Typography
              component="code"
              sx={{
                backgroundColor: theme.palette.grey[200],
                px: 0.5,
                borderRadius: 1,
                fontFamily: 'monospace'
              }}
              {...props}
            >
              {children}
            </Typography>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;