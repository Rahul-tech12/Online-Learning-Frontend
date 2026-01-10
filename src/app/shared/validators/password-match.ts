import { AbstractControl, ValidationErrors } from "@angular/forms";

export function PasswordMatch(control:AbstractControl):ValidationErrors | null {
    const password=control.get('password')?.value;
    const confirmPw=control.get('confirmPassword')?.value;
    if(!password || !confirmPw) return null;
    return password===confirmPw?null:{passwordMisMatch:true};
}
