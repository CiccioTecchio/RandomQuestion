#include<stdio.h>
#include<stdlib.h>
#include<time.h>

#define MAXCHAR 1000
FILE *fp;

void checkArgs(int argc, char* argv[]);
int lineCounter();

int main(int argc, char* argv[]){
checkArgs(argc,argv);
srand(time(NULL));
int line = lineCounter();
printf("Press ENTER to start with the question...\n");
int question = rand() % line + 1;
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
question = rand() % line + 1;
ch = fgetc(stdin);
}
printf("Terminated\n");

fclose(fp);
return 0;	
}

void checkArgs(int argc, char* argv[]){
	if(argc!=2){
		printf("Enter <name of file whit question>\n");
		exit(0);
	}else{
			fp = fopen(argv[1],"r");
	}
}

int lineCounter(){
	int count = 0;
	char ch = fgetc(fp);
	while(ch != EOF){
		if(ch == '\n') count++;
		ch = fgetc(fp);
	}
	fseek(fp, 0, SEEK_SET);
	return count;
}