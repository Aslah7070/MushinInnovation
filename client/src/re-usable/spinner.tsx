export  function Spinner() {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="relative w-8 h-8 animate-spin" style={{ animationDuration: '0.8s' }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30);

            const opacity = i === 0 ? 0.9 : Math.max(0.15, 0.9 - (i * 0.075));
            
            return (
              <div 
                key={i}
                className="absolute bg-gray-400 rounded-full" 
                style={{
                  width: '3px',
                  height: '8px',
                  opacity,
                  left: 'calc(50% - 1px)',
                  top: '0px',
                  transformOrigin: '1px 14px',
                  transform: `rotate(${angle}deg)`,
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }