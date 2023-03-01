import React from 'react';
import { Box, Typography } from '@material-ui/core';

const SummaryBox = ({ title, amount }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            border={1}
            borderColor="primary.main"
            borderRadius={16}
            p={2}
            m={2}
            minWidth={200}
        >
            <Typography variant="h5">{title}</Typography>
            <Typography variant="h3">${amount}</Typography>
        </Box>
    );
};

export default SummaryBox;
