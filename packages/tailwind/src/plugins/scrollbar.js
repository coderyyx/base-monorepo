exports.ScrollbarPlugin = ({ addComponents }) => {
  addComponents({
    '.scrollbar-dark': {
      '&::-webkit-scrollbar': {
        width: '4px',
        height: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        'border-radius': '2px',
        'background-color': 'rgba(255, 255, 255, 0.12)',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        width: '6px',
        height: '6px',
        'border-radius': '4px',
        'background-color': 'rgba(255, 255, 255, 0.32)',
      },
    },
    '.scrollbar-light': {
      '&::-webkit-scrollbar': {
        width: '4px',
        height: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        'border-radius': '2px',
        'background-color': 'rgba(0, 0, 0, 0.08)',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        width: '6px',
        height: '6px',
        'border-radius': '4px',
        'background-color': 'rgba(0, 0, 0, 0.16)',
      },
    },
  });
};

