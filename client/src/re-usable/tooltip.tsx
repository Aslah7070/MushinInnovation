
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { type TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import type { IToolTips } from '../interfaces/user';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
  },
});




export function SmallTooltip({longText,element,position,bgColor="#1e293b",textColor="#f8fafc"}:IToolTips) {
  return (
    <Tooltip  title={longText} placement={position}
    slotProps={{
        popper:{
            sx:{
                [`& .${tooltipClasses.tooltip}`]: { 
              backgroundColor: bgColor,
              color: textColor,
              fontSize: "14px",
              borderRadius: "8px",
              padding: "8px 12px",
            },
            [`& .${tooltipClasses.arrow}`]: {
              color: bgColor,
            },
            }
        }
    }}
    >
      <Button sx={{ m: 1 }}>{element}</Button>
    </Tooltip>
  );
}


export function MiddleTooltip({longText,element,bgColor="#1e293b",textColor="#f8fafc"}:IToolTips) {
  return (
    <CustomWidthTooltip title={longText}
     slotProps={{
        popper:{
            sx:{
                [`& .${tooltipClasses.tooltip}`]: { 
              backgroundColor: bgColor,
              color: textColor,
              fontSize: "14px",
              borderRadius: "8px",
              padding: "8px 12px",
            },
            [`& .${tooltipClasses.arrow}`]: {
              color: bgColor,
            },
            }
        }
    }}
    >
      <Button sx={{ m: 1 }}>{element}</Button>
    </CustomWidthTooltip>
  );
}


export function LongToolTip({longText,element,bgColor="#1e293b",textColor="#f8fafc"}:IToolTips) {
  return (
    <NoMaxWidthTooltip title={longText}
        slotProps={{
        popper:{
            sx:{
                [`& .${tooltipClasses.tooltip}`]: { 
              backgroundColor: bgColor,
              color: textColor,
              fontSize: "14px",
              borderRadius: "8px",
              padding: "8px 12px",
            },
            [`& .${tooltipClasses.arrow}`]: {
              color: bgColor,
            },
            }
        }
    }}
    >
      <Button sx={{ m: 1 }}>{element}</Button>
    </NoMaxWidthTooltip>
  );
}
