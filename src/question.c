#include<stdio.h>
#include<stdlib.h>

#define MAXCHAR 1000
FILE *fp;

void checkArgs(int argc, char* argv[]);

int main(int argc, char* argv[]){
checkArgs(argc,argv);
srand(atoi(argv[3]));
printf("Press ENTER to start with the question...\n");
int question = rand() % atoi(argv[2]) + 1;
char ch;
ch = fgetc(stdin);
while(ch==0x0A){
	char str [MAXCHAR];
	int i=0;
	while(i<question){
		while (fgets(str, MAXCHAR, fp)!= NULL && i!=question)
		i++;
	}
printf("> %s",str);
fseek(fp, 0, SEEK_SET);
question = rand() % atoi(argv[2]) + 1;
ch = fgetc(stdin);
}
printf("Terminated\n");

fclose(fp);
return 0;	
}

void checkArgs(int argc, char* argv[]){
	if(argc!=4){
		printf("Enter <name of file whit question> <number of line> <seed number>\n");
		exit(0);
	}else{
			fp = fopen(argv[1],"r");
			if(!fp || atoi(argv[2]) <= 0){
			printf("Make sure that the file exists or the number of line is positive\n");
			exit(0);
			}
	}
}