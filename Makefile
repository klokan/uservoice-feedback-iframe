CLOSURE=./closure-library
COMPILER=$(CLOSURE)/compiler.jar

all:
	# Generate the deps.js for actual directory (the local namespace)

	$(CLOSURE)/closure/bin/build/depswriter.py --root_with_prefix=". ../../../" --output_file=deps.js

	# Compile the application into index.js

	$(CLOSURE)/closure/bin/build/closurebuilder.py --root=$(CLOSURE)/closure/goog/ --root=$(CLOSURE)/third_party/closure/ --output_mode=compiled --compiler_jar=$(COMPILER) --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" --root=. --input=main.js --output_file=index.js
