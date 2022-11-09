@echo off
cd %~dp0
%~d0
sass --watch ufrog-gen.scss:ufrog-gen.css
pause