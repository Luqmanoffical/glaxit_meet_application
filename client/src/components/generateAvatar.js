
export const generateAvatar = (username, size = 100, bgColor = '#000', textColor = '#fff') => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
  
  
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  
    
    context.fillStyle = textColor;
    context.font = `${size / 2}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(username.charAt(0).toUpperCase(), size / 2, size / 2);
  
    return canvas.toDataURL('image/png');
  };
  